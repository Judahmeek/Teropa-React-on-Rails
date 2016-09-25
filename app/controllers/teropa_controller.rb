class TeropaController < ApplicationController
  def index
    candidate_pair = Candidate.all
    if candidate_pair.size == 1
      @props = { winner: candidate_pair[0].name }
    else
      @props = { vote: { pair: [], tally: {} } }
      candidate_pair.each do |candidate|
        @props.vote.pair.append(candidate.name)
        @props.tally[candidate.name] = candidate.total_votes
      end
    end
  end
end
