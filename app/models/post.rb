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

    # validate ensure_photo

    has_one_attached :photo

    belongs_to :poster, 
        foreign_key: :poster_id,
        class_name: :User

    has_many :comments,
        primary_key: :id,
        foreign_key: :post_id,
        class_name: :Comment,
        dependent: :destroy

    # def ensure_photo
    #     unless self.photo.attached?
    #         errors.add(:photo, "must be attached")
    #     end
    # end
end
