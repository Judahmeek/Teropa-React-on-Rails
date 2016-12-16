module AjaxHelper
  def select_winner(candidates)
    if candidates[0].total_votes > candidates[1].total_votes
      return [candidates[0]]
    end
    
    if candidates[1].total_votes > candidates[0].total_votes
      return [candidates[1]]
    end
    
    candidates
  end
end
