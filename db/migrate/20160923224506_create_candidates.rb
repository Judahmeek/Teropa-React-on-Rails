class CreateCandidates < ActiveRecord::Migration[5.0]
  def change
    create_table :candidates, force: :cascade do |t|
      t.string      "name",         null: false
      t.integer     "total_votes",  default: 0, null: false
      t.timestamps
    end
  end
end
