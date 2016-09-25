class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes, force: :cascade do |t|
      t.references :candidates, foreign_key: true

      t.timestamps
    end
  end
end
