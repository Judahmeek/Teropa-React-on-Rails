#:nodoc:
# frozen_string_literal: true
class CreateEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :entries do |t|
      t.string 'name', null: false

      t.timestamps
    end
  end
end
