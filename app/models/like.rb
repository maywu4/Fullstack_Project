# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  post_id    :bigint           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
    validates :post_id, :user_id, presence: true

    belongs_to :liked_post,
        foreign_key: :post_id,
        class_name: :Post

    belongs_to :liker, 
        foreign_key: :user_id,
        class_name: :User

end
