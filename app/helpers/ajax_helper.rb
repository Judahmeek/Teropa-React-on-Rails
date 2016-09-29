module AjaxHelper
  def pair_to_json(ary)
    { 
      vote: { 
        pair: [ary[0].name, ary[1].name],
        tally: {
          ary[0].name => ary[0].total_votes,
          ary[1].name => ary[1].total_votes
        }
      }
    }.to_json
  end
  
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
