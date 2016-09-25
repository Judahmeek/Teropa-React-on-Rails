Rails.application.routes.draw do
  get '/', to: 'teropa#index'
  post '/next', to: 'ajax#next_round'
  post '/vote/:id', to: 'ajax#vote'
  post '/restart', to: 'ajax#restart'
end
