class User < ApplicationRecord
  validates :name, :surname, :email, presence: true
  has_secure_password
end
