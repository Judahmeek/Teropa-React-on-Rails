class TeropaController < ApplicationController
  def index
    candidate_pair = Candidate.all
    if candidate_pair.empty?
      @props = { winner: Entry.first.name }
    else
      @props = { vote: { pair: [], tally: {} } }
      candidate_pair.each do |candidate|
        @props[:vote][:pair].append(candidate.name)
        @props[:vote][:tally][candidate.name] = candidate.total_votes
      end
    end
  end
end
