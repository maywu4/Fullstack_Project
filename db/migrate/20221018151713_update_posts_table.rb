class UpdatePostsTable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :posts, :poster_id, false

  end
end
