# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create users with an easy to remember username, email, and password:
  user1 = User.create!(
    username: 'Testing-123', 
    email: 'helloWord@user.io', 
    first_name: 'Hello',
    last_name: 'World',
    age: 31,
    password: 'starwarsarethebestwars',
    about: 'If you see something that moves you, and then snap it, you keep a moment. - Linda McCartney' 
  )

  user1_profile = URI.open('https://momentcaptur.s3.amazonaws.com/user1ProfilePic.png')
  user1.profile_pic.attach(io: user1_profile, filename: 'user1ProfilePic.png')
  user1_cover = URI.open('https://momentcaptur.s3.amazonaws.com/little_island.png')
  user1.cover_pic.attach(io: user1_cover, filename: 'little_island.png')

  User.create!(
    username: '456-Testing', 
    email: 'internetPhotographer@user.io', 
    first_name: 'Internet',
    last_name: 'Photographer',
    age: 23,
    password: 'asdfghjklzxcvbnm',
    about: 'The picture that you took with your camera is the imagination you want to create with reality. - Scott Lorenzo'
  )

  user3 = User.create!(
    username: 'maxi-maxi-maxi', 
    email: 'maxi_maxi_maxi@user.io', 
    first_name: 'Maxi',
    last_name: 'Maxi',
    age: 18,
    password: 'qwertyuiop..'
  )

  user3_profile = URI.open('https://momentcaptur.s3.amazonaws.com/maxiProfile.png')
  user3.profile_pic.attach(io: user3_profile, filename: 'maxiProfile.png')

  User.create!(
    username: 'asdfghjkl', 
    email: 'asdfghjkl@user.io', 
    first_name: 'ASDFG',
    last_name: 'HJKL',
    age: 52,
    password: 'zxcvbnm,./12345',
  )


  puts "Creating posts..."

  Post.create!(
    title:"Sky's on Fire",
    description: 'Sunset over Verrazano Bridge',
    poster_id: 1
  )

  Post.create!(
    title:'Little Island',
    description: "NYC's Little Island",
    poster_id: 1
  )

  Post.create!(
    title:'Hello Maxi',
    poster_id: 3
  )

  Post.create!(
    title:'Maxi Maxi Maxi!',
    poster_id: 3
  )

  Post.create!(
    title:"Maxi's Nap Time",
    description: 'The best time of the day is nap time',
    poster_id: 3
  )

  puts "Done!"
end