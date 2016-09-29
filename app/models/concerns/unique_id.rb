module UniqueId
  extend ActiveSupport::Concern

  included do
    include ActiveUUID::UUID
    before_create :populate_uuid

    private

    def populate_uuid
      begin
        self.id = UUIDTools::UUID.random_create
      end while self.class.exists?(id: id)
    end
  end
end