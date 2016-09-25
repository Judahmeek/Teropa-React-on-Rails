module AjaxHelper
  def current_state
    entries = Entry.first(2)
    if entries.size == 1
      render json: {winner: entries.name}
    else
      candidates = entries.map { |entry| Candidate.create(entry.name) }
      @pair = candidates
    end
  end
end
