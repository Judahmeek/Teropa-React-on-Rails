require 'rails_helper'

RSpec.describe AjaxController, type: :controller do
  describe "next_round" do
    it "returns the winning entry if there is only a single entry left" do
      Candidate.create([{name: "Taco Bell", total_votes: 2}, {name: "McDonalds", total_votes: 0}])
      post :next_round
      expect(response.body).to eql({winner: "Taco Bell"}.to_json)
    end
    
    it "returns two new candidates if there is more than one entry left" do
      Candidate.create([{name: "Taco Bell", total_votes: 2}, {name: "McDonalds", total_votes: 0}])
      Entry.create(name: "Burger King")
      post :next_round
      expect(response).to render_template('ajax/pair')
      candidates = assigns(:pair)
      expect(candidates.map(&:name)).to eql(["Burger King", "Taco Bell"])
    end
    
    it "purges the votes and candidates tables" do
      Candidate.create([{name: "Taco Bell", total_votes: 2}, {name: "McDonalds", total_votes: 0}])
      Entry.create(name: "Burger King")
      Vote.create(candidates_id: 3)
      post :next_round
      expect(Vote.any?).to be_falsy
    end
    
    it "does nothing if there is a tie between candidates" do
      Candidate.create([{name: "Taco Bell", total_votes: 2}, {name: "McDonalds", total_votes: 2}])
      post :next_round
      expect(response.body).to eql('')
    end
  end
  
  describe "restart" do
    it "clears and reseeds entry database" do
      Candidate.create(name: "Ice Cream")
      Vote.create(candidates_id: 4)
      Entry.create(name: "This shouldn't be here")
      post :restart
      expect(Vote.first).to be_falsy
      
      candidates = Candidate.all
      candidate_names = candidates.map(&:name)
      expect(candidate_names).to eql(["Star Wars", "Lord of the Rings"])
      
      entries = Entry.all
      entry_names = entries.map(&:name)
      expect(entry_names).to eql(["Titanic", "The Godfather"])
    end
  end
  
  describe "vote" do
    it "increments the total_votes counter for the select candidate" do
      Candidate.create(name: "Taco Bell", total_votes: 2)
      selected_candidate = Candidate.create(name: "McDonalds", total_votes: 0)
      post :vote, params: { id: selected_candidate.id }
      expect(response.body).to eql('')
    end
    
    it "provides the voter with a session_id if the voter does not have one already" do
      Candidate.create(name: "Taco Bell", total_votes: 2)
      selected_candidate = Candidate.create(name: "McDonalds", total_votes: 0)
      post :vote, params: { id: selected_candidate.id }
      expect(session[:user_id]).to eql(1)
    end
    
    it "updates the total_votes counter for both candidates if the voter is switching their vote" do
      old_candidate = Candidate.create(name: "Taco Bell", total_votes: 2)
      selected_candidate = Candidate.create(name: "McDonalds", total_votes: 0)
      vote = Vote.create(candidates_id: old_candidate.id)
      post :vote, params: { id: selected_candidate.id }, session: { user_id: vote.id }
      expect(response.body).to eql('')
    end
    
    it "does nothing if the voter repeats the same vote" do
      Candidate.create(name: "Taco Bell", total_votes: 2)
      selected_candidate = Candidate.create(name: "McDonalds", total_votes: 0)
      vote = Vote.create(candidates_id: selected_candidate.id)
      post :vote, params: { id: selected_candidate.id }, session: { user_id: vote.id }
      expect(response.body).to eql('')
    end
  end
end