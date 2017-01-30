# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Results', js: true do
  before(:example) do
    create(:star_wars)
    create(:lotr)
  end

  it 'contains divs with candidate names' do
    visit '#/results'
    expect(page).to have_text 'Star Wars'
    expect(page).to have_text 'Lord of the Rings'
  end

  it 'contains administration buttons' do
    visit '#/results'
    expect(page).to have_text 'Restart'
    expect(page).to have_text 'Next'
  end

  describe 'Restart', js: true do
    it 'removes all tallies and reinitializes entries' do
      visit root_path
      click_button('Star Wars')
      visit '#/results'
      expect(page.find('h1',
                       text: 'Star Wars',
                       match: :prefer_exact).find(:xpath, '..')).to have_text '1'

      click_button 'Restart'
      expect(page.find('h1',
                       text: 'Star Wars',
                       match: :prefer_exact).find(:xpath, '..')).to have_text '0'
    end
  end

  describe 'Next', js: true do
    it 'calculates results of contest' do
      visit root_path
      click_button('Star Wars')
      visit '#/results'
      expect(page.find('h1',
                       text: 'Star Wars',
                       match: :prefer_exact).find(:xpath, '..')).to have_text '1'
      click_button 'Next'
      expect(page.find('.winner')).to have_text 'Winner is "Star Wars"!'
    end
  end
end
