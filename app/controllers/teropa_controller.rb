# This controller and its corresponding view supply the react component and its initial props
# frozen_string_literal: true
class TeropaController < ApplicationController
  def index
    candidate_pair = Candidate.order(:id)
    @props = if candidate_pair.empty?
               { winner: Entry.first.name }
             else
               strip_timestamps(candidate_pair)
             end
  end
end
