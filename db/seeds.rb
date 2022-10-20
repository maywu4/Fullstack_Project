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
  user1_cover = URI.open('https://momentcaptur.s3.amazonaws.com/cover2.png')
  user1.cover_pic.attach(io: user1_cover, filename: 'cover2.png')

  user2 = User.create!(
    username: '456-Testing', 
    email: 'internetPhotographer@user.io', 
    first_name: 'A',
    last_name: 'C',
    age: 23,
    password: 'asdfghjklzxcvbnm',
    about: 'The picture that you took with your camera is the imagination you want to create with reality. - Scott Lorenzo'
  )

  user2_profile = URI.open('https://momentcaptur.s3.amazonaws.com/ACProfile.png')
  user2.profile_pic.attach(io: user2_profile, filename: 'ACProfile.png')
  user2_cover = URI.open('https://momentcaptur.s3.amazonaws.com/ACCover.png')
  user2.cover_pic.attach(io: user2_cover, filename: 'ACCover.png')


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
    about: 'Lorem ipsum dolor sit amet, ad unum regione nec, meis honestatis accommodare per an, primis verterem te ius. Qui ne prima euismod, sit assueverit referrentur no. Errem salutandi incorrupte vis id, accumsan facilisis philosophia has eu. Eu quo error nobis eruditi, mea facilis habemus sententiae at.'
  )


  puts "Creating posts..."

  post1 = Post.create!(
    title:"Sky's on Fire",
    description: 'Sunset over Verrazano Bridge',
    poster_id: 1
  )

  post1_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user1/skyOnFire.png')
  post1.photo.attach(io: post1_pic, filename: 'skyOnFire.png')


  post2 = Post.create!(
    title:'Little Island',
    description: "NYC's Little Island",
    poster_id: 1
  )

  post2_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user1/littleIsland.png')
  post2.photo.attach(io: post2_pic, filename: 'littleIsland.png')


  post3 = Post.create!(
    title:"Peaceful Ocean",
    poster_id: 1
  )

  post3_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user1/peacefulOcean.png')
  post3.photo.attach(io: post3_pic, filename: 'peacefulOcean.png')


  post4 = Post.create!(
    title:'Boston in the Fall',
    description: "Boston Public Garden, MA",
    poster_id: 1
  )

  post4_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user1/bostonPark.png')
  post4.photo.attach(io: post4_pic, filename: 'bostonPark.png')


  post5 = Post.create!(
    title:'Breath of Fresh Air',
    poster_id: 1
  )

  post5_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user1/resevoir.png')
  post5.photo.attach(io: post5_pic, filename: 'resevoir.png')


  post6 = Post.create!(
    title:'Sunset on a Boat',
    poster_id: 2
  )

  post6_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user2/sunsetOnBoat.png')
  post6.photo.attach(io: post6_pic, filename: 'sunsetOnBoat.png')

  post7 = Post.create!(
    title:"Hiker's View",
    poster_id: 2
  )

  post7_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user2/hikersView.png')
  post7.photo.attach(io: post7_pic, filename: 'hikersView.png')
  

  post8 = Post.create!(
    title:"LA Sunset",
    poster_id: 2
  )

  post8_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user2/ACCover.png')
  post8.photo.attach(io: post8_pic, filename: 'ACCover.png')

  post9 = Post.create!(
    title:"City Views",
    poster_id: 2
  )

  post9_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user2/cityView.png')
  post9.photo.attach(io: post9_pic, filename: 'cityView.png')

  post10 = Post.create!(
    title:"It's Beginning to Feel a Lot Like Winter",
    poster_id: 2
  )

  post10_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user2/winter.png')
  post10.photo.attach(io: post10_pic, filename: 'winter.png')

  post11 = Post.create!(
    title:"Boston Charles River Esplanade",
    poster_id: 4
  )

  post11_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user4/bostonRiver.png')
  post11.photo.attach(io: post11_pic, filename: 'bostonRiver.png')

  post12 = Post.create!(
    title:"Peak hiking",
    description: "What's the best part of a hike? The peak.",
    poster_id: 4
  )

  post12_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user4/hike.png')
  post12.photo.attach(io: post12_pic, filename: 'hike.png')

  post13 = Post.create!(
    title:"Beach day",
    description: "Santa Monica Pier, Los Angeles",
    poster_id: 4
  )

  post13_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user4/santaMonica.png')
  post13.photo.attach(io: post13_pic, filename: 'santaMonica.png')

  post14 = Post.create!(
    title:"Washington Mews, NYC",
    poster_id: 4
  )

  post14_pic = URI.open('https://momentcaptur.s3.amazonaws.com/user4/washingtonMews.png')
  post14.photo.attach(io: post14_pic, filename: 'washingtonMews.png')

  # Post.create!(
  #   title:'Hello Maxi',
  #   poster_id: 3
  # )

  # Post.create!(
  #   title:'Maxi Maxi Maxi!',
  #   poster_id: 3
  # )

  # Post.create!(
  #   title:"Maxi's Nap Time",
  #   description: 'The best time of the day is nap time',
  #   poster_id: 3
  # )

  puts "Done!"
end