class TeropaController < ApplicationController
  def index
    candidate_pair = Candidate.order(:id)
    if candidate_pair.empty?
      @props = { winner: Entry.first.name }
    else
      @props = strip_timestamps(candidate_pair)
    end
  end
end
