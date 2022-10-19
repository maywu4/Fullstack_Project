# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  age             :integer          not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  about           :string
#
class User < ApplicationRecord
    has_secure_password

    validates :first_name, :last_name, presence: true
    
    validates :age, presence: true, numericality: { greater_than_or_equal_to: 13, message: '- In order to use MomentCaptur, you must be 13 or older' }

    validates :session_token, presence: true, uniqueness: true

    validates :username, uniqueness: true

    validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP } 

    validates :password, length: { minimum: 12 }, allow_nil: true

    before_validation :ensure_session_token

    # has_many_attached :photos
    has_one_attached :profile_pic
    has_one_attached :cover_pic


    has_many :posts, 
        primary_key: :id, 
        foreign_key: :poster_id,
        class_name: :Post,
        dependent: :destroy

    def self.find_by_credentials(credential, password)

        if credential.match(URI::MailTo::EMAIL_REGEXP)
            user = User.find_by(email: credential)
        else 
            user = User.find_by(username: credential)
        end

        if user && user.authenticate(password)
            user
        else
            nil
        end

    end

    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end


    private 

    def generate_unique_session_token
        token = SecureRandom.base64

        while User.exists?(session_token: token)
            token = SecureRandom.base64
        end

        token
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end


end
