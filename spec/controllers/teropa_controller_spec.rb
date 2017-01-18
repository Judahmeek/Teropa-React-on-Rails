require 'rails_helper'

RSpec.describe TeropaController, type: :controller do
  describe "@props" do
    it "contains the winning entry if there is only a single entry left" do
      Entry.create(name: "Burger King")
      get :index
      expect(assigns(:props)).to eql({ winner: "Burger King" })
    end
    
    it "contains both candidates if the candidate table is populated" do
      candidates = Candidate.create([{name: "Burger King"}, {name: "McDonalds"}])
      get :index
      expect(assigns(:props)).to eql([{"id"=>candidates[0].id, "name"=>"Burger King", "total_votes"=>0}, {"id"=>candidates[1].id, "name"=>"McDonalds", "total_votes"=>0}])
    end
  end
end