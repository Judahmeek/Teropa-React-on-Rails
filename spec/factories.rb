# frozen_string_literal: true
FactoryGirl.define do
  factory :candidate do
    name 'candidate'

    factory :star_wars do
      name 'Star Wars'
    end

    factory :lotr do
      name 'Lord of the Rings'
    end
  end

  factory :entry do
    name 'entry'

    factory :godfather do
      name 'The Godfather'
    end
  end
end
