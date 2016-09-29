require 'rails_helper'

RSpec.describe TeropaController, type: :controller do
  describe "@props" do
    it "contains the winning entry if there is only a single entry left" do
      Entry.create(name: "Burger King")
      get :index
      expect(assigns(:props)).to eql({ winner: "Burger King" })
    end
    
    it "contains both candidates if the candidate table is populated" do
      Candidate.create([{name: "Burger King"}, {name: "McDonalds"}])
      get :index
      expect(assigns(:props)).to eql({:vote => {:pair=>["Burger King", "McDonalds"], :tally=>{"Burger King"=>0, "McDonalds"=>0}}})
    end
  end
end