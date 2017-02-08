#:nodoc:
# frozen_string_literal: true
class AjaxController < ApplicationController
  def next_round
    candidate_pair = Candidate.order(:id)
    survivors = helpers.select_winner(candidate_pair)
    unless survivors.size == 2 # in case of tie
      Vote.destroy_all
      Candidate.destroy_all
      session[:vote_id] = nil
      Entry.create(name: survivors[0].name)
      entries = Entry.first(2)
      if entries.size == 1
        render json: { winner: entries[0].name } and return
      else
        candidate_pair = entries.map do |entry|
          Entry.destroy(entry.id)
          Candidate.create(name: entry.name)
        end
      end
    end
    render json: label_pair(strip_timestamps(candidate_pair))
  end

  def restart
    Vote.destroy_all
    Candidate.destroy_all
    Entry.destroy_all
    ActiveRecord::Tasks::DatabaseTasks.load_seed
    session[:vote_id] = nil
    candidate_pair = Candidate.order(:id)
    render json: label_pair(strip_timestamps(candidate_pair))
  end

  def vote
    candidate = Candidate.find(params[:id])
    if candidate
      if session[:vote_id]
        vote = Vote.find(session[:vote_id])
        head :no_content and return if vote.candidates_id == candidate.id
        old_candidate = Candidate.find(vote.candidates_id)
        vote.update(candidates_id: params[:id])
        old_candidate.update(total_votes: old_candidate.total_votes - 1)
      else
        vote = Vote.create(candidates_id: params[:id])
      end
      session[:vote_id] = vote.id
      candidate.update(total_votes: candidate.total_votes + 1)
    end
    candidate_pair = Candidate.order(:id)
    render json: label_pair(strip_timestamps(candidate_pair))
  end
end
