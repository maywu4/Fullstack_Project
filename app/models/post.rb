# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  title       :string
#  description :text
#  poster_id   :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Post < ApplicationRecord
    validates :poster_id, presence: true

    has_one_attached :photo

    belongs_to :poster, 
        foreign_key: :poster_id,
        class_name: :User

end
