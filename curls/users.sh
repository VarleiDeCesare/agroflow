curl --request POST \
  --url http://localhost:3001/users \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NDA3NGJhOC1lMDJkLTQ3MGUtODNmNy1lZjgwZGM4YThkMDEiLCJlbWFpbCI6InZhcmxlaUBnbWFpbC5jb20iLCJpYXQiOjE2NjI1NjEzODQsImV4cCI6MTY2MjY0Nzc4NH0.W_GAZelL7IOEtbxlcDt3Il8k3qC91vItZmiKl8R8us0' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Varlei",
	"surname": "De Cesare",
	"email": "varleidecesare2222@gmail.com",
	"password": "Gremio321",
	"passwordConfirmation": "Gremio321",
	"cpf": "04075467074"
}'



curl --request POST \
  --url http://localhost:3001/users \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NDA3NGJhOC1lMDJkLTQ3MGUtODNmNy1lZjgwZGM4YThkMDEiLCJlbWFpbCI6InZhcmxlaUBnbWFpbC5jb20iLCJpYXQiOjE2NjI1NjEzODQsImV4cCI6MTY2MjY0Nzc4NH0.W_GAZelL7IOEtbxlcDt3Il8k3qC91vItZmiKl8R8us0' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Jean",
	"surname": "De Cesare",
	"email": "jean@gmail.com",
	"password": "Gremio321",
	"passwordConfirmation": "Gremio321",
	"cpf": "01234567890"
}'
