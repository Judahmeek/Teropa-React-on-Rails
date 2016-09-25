class TeropaController < ApplicationController
  def next_round
    pair = Candidate.all
    survivors = tally_votes(pair)
    if survivors.size == 2 #in case of tie
      @pair = survivors
    else
      Entry.create(name: survivors.name)
      current_state
    end
  end
  
  def restart
    ActiveRecord::Tasks::DatabaseTasks.purge_current
    ActiveRecord::Tasks::DatabaseTasks.load_seed
    current_state
  end
  
  def vote
    candidate = Candidate.find(params[:id])
    candidate.increment(:total_votes)
    @pair = Candidate.all
  end
end