class User < ApplicationRecord
  validates :name, :surname, :email, presence: true
end
