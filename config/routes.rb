# frozen_string_literal: true
Rails.application.routes.draw do
  root 'teropa#index'
  post 'api/next', to: 'ajax#next_round'
  post 'api/vote', to: 'ajax#vote'
  post 'api/restart', to: 'ajax#restart'
end
