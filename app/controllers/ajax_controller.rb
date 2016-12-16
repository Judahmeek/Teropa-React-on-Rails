class AjaxController < ApplicationController
  def next_round
    candidate_pair = Candidate.all
    survivors = helpers.select_winner(candidate_pair)
    if survivors.size == 2 #in case of tie
      @pair = survivors
    else
      Vote.destroy_all
      Candidate.destroy_all
      Entry.create(name: survivors[0].name)
    
      entries = Entry.first(2)
      if entries.size == 1
        render json: {winner: entries[0].name} and return
      else
        candidate_pair = entries.map { |entry| Candidate.create(name: entry.name) }
        @props = strip_timestamps(candidate_pair)
      end
    end
    render 'ajax/pair', formats: :json
  end
  
  def restart
    Vote.destroy_all
    Candidate.destroy_all
    Entry.destroy_all
    ActiveRecord::Tasks::DatabaseTasks.load_seed
    candidate_pair = Candidate.all
    @props = strip_timestamps(candidate_pair)
    render 'ajax/pair', formats: :json
  end
  
  def vote
    candidate = Candidate.find(params[:id])
    if candidate
      if session[:user_id]
        vote = Vote.find(session[:user_id])
        if vote
          old_candidate = Candidate.find(vote.candidates_id)
          vote.update(candidates_id: params[:id])
          old_candidate.decrement(:total_votes)
          old_candidate.save
        end
      end
      candidate.increment(:total_votes)
      candidate.save
      
      vote = Vote.create(candidates_id: params[:id])
      session[:user_id] = vote.id
    end
    candidate_pair = Candidate.all
    @props = strip_timestamps(candidate_pair)
    render 'ajax/pair', formats: :json
  end
end