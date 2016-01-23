json.array!(@trails) do |trail|
  json.extract! trail, :id, :name, :idNum
  json.url trail_url(trail, format: :json)
end
