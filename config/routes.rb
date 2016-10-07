Rails.application.routes.draw do
  get '/', to: 'teropa#index'
  post 'api/next', to: 'ajax#next_round'
  post 'api/vote', to: 'ajax#vote'
  post 'api/restart', to: 'ajax#restart'
end
