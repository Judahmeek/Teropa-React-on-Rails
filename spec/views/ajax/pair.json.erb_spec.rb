require 'rails_helper'

RSpec.describe "ajax/pair", type: :view do
  it "displays pairs of candidates as expected" do
    assign(:pair, Candidate.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }]))

    render

    expect(rendered).to eql("{&quot;vote&quot;:{&quot;pair&quot;:[&quot;Star Wars&quot;,&quot;Lord of the Rings&quot;],&quot;tally&quot;:{&quot;Star Wars&quot;:0,&quot;Lord of the Rings&quot;:0}}}")
  end
end