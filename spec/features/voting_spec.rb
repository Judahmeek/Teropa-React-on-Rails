# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Voting', js: true do
  before(:example) do
    create(:star_wars)
    create(:lotr)
    visit root_path
  end

  it 'contains buttons with candidate names' do
    expect(page).to have_button 'Star Wars'
    expect(page).to have_button 'Lord of the Rings'
  end

  it 'signals which candidate the user has chosen' do
    click_button('Star Wars')
    expect(find_button('Star Wars')).to have_content 'Chosen'
  end

  it 'adds 1 to the tally of the chosen candidate' do
    click_button('Star Wars')
    visit '#/results'
    expect(page.find('h1',
                     text: 'Star Wars',
                     match: :prefer_exact).find(:xpath, '..')).to have_text '1'
  end
end
