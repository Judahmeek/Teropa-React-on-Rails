# frozen_string_literal: true
require 'rails_helper'

RSpec.describe AjaxController, type: :controller do
  describe 'next_round' do
    it 'returns the winning entry if there is only a single entry left' do
      Candidate.create([{ name: 'Taco Bell', total_votes: 2 },
                        { name: 'McDonalds', total_votes: 0 }])
      post :next_round
      expect(response.body).to eql({ winner: 'Taco Bell' }.to_json)
    end

    it 'returns two new candidates if there is more than one entry left' do
      Candidate.create([{ name: 'Taco Bell', total_votes: 2 },
                        { name: 'McDonalds', total_votes: 0 }])
      Entry.create(name: 'Burger King')
      post :next_round
      expect(response.body).to match('Burger King')
      expect(response.body).to match('Taco Bell')
    end

    it 'purges the votes and candidates tables' do
      candidates = Candidate.create([{ name: 'Taco Bell', total_votes: 2 },
                                     { name: 'McDonalds', total_votes: 0 }])
      Entry.create(name: 'Burger King')
      Vote.create(candidates_id: candidates[0].id)
      post :next_round
      expect(Vote.any?).to be_falsy
    end

    it 'does nothing if there is a tie between candidates' do
      candidates = Candidate.create([{ name: 'Taco Bell', total_votes: 2 },
                                     { name: 'McDonalds', total_votes: 2 }])
      post :next_round
      expect(response.body).to eql({ '$$pair':
                                      [{ id: candidates[0].id,
                                         name: 'Taco Bell', total_votes: 2 },
                                       { id: candidates[1].id,
                                         name: 'McDonalds', total_votes: 2 }] }.to_json)
    end
  end

  describe 'restart' do
    it 'clears and reseeds entry database' do
      candidate = Candidate.create(name: 'Ice Cream')
      Vote.create(candidates_id: candidate.id)
      Entry.create(name: 'Bad')
      post :restart
      expect(Vote.first).to be_falsy

      candidates = Candidate.all
      candidate_names = candidates.map(&:name)
      expect(candidate_names).to eql(['Star Wars', 'Lord of the Rings'])

      entries = Entry.all
      entry_names = entries.map(&:name)
      expect(entry_names).to eql(['Titanic', 'The Godfather'])
    end
  end

  describe 'vote' do
    it 'increments the total_votes counter for the select candidate' do
      candidate = Candidate.create(name: 'Taco Bell', total_votes: 2)
      selected_candidate = Candidate.create(name: 'McDonalds', total_votes: 0)
      post :vote, params: { id: selected_candidate.id }
      expect(response.body).to eql({ '$$pair':
                                      [{ id: candidate.id,
                                         name: 'Taco Bell', total_votes: 2 },
                                       { id: selected_candidate.id,
                                         name: 'McDonalds', total_votes: 1 }] }.to_json)
    end

    it 'provides the voter with a session_id if the voter does not have one already' do
      Candidate.create(name: 'Taco Bell', total_votes: 2)
      selected_candidate = Candidate.create(name: 'McDonalds', total_votes: 0)
      expect(session[:vote_id]).to be_nil
      post :vote, params: { id: selected_candidate.id }
      expect(session[:vote_id]).to be_truthy
    end

    it 'updates the total_votes counter for both candidates if the voter is switching their vote' do
      old_candidate = Candidate.create(name: 'Taco Bell', total_votes: 2)
      new_candidate = Candidate.create(name: 'McDonalds', total_votes: 0)
      vote = Vote.create(candidates_id: old_candidate.id)
      post :vote, params: { id: new_candidate.id }, session: { vote_id: vote.id }
      expect(response.body).to eql({ '$$pair':
                                      [{ id: old_candidate.id,
                                         name: 'Taco Bell', total_votes: 1 },
                                       { id: new_candidate.id,
                                         name: 'McDonalds', total_votes: 1 }] }.to_json)
    end

    it 'renders nothing if the voter repeats the same vote' do
      selected_candidate = Candidate.create(name: 'McDonalds', total_votes: 0)
      vote = Vote.create(candidates_id: selected_candidate.id)
      post :vote, params: { id: selected_candidate.id }, session: { vote_id: vote.id }
      expect(response.body).to eql('')
    end
  end
end
