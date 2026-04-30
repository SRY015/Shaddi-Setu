import type { ServicePackage } from "../../Types/artistTypes";

const ServicePackageModal = ({
  editingPackageId,
  packageForm,
  setPackageForm,
  handleSavePackage,
  setShowPackageModal,
}: {
  editingPackageId: string | null;
  packageForm: ServicePackage;
  setPackageForm: (prev: any) => void;
  handleSavePackage: () => void;
  setShowPackageModal: (value: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-xl border border-[#ece7e8] space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-[#1c1b1c]">
            {editingPackageId ? "Edit Service Package" : "Add Service Package"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to create or update your service package.
          </p>
        </div>

        {/* Package Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#1c1b1c]/80">
            Package Title
          </label>
          <input
            type="text"
            placeholder="e.g. Full Bridal Mehendi"
            value={packageForm.title}
            onChange={(e) =>
              setPackageForm((prev: any) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="w-full p-4 rounded-2xl bg-[#f7f2f3] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#1c1b1c]/80">
            Package Price (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 11000"
            value={packageForm.price}
            onChange={(e) =>
              setPackageForm((prev: any) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            className="w-full p-4 rounded-2xl bg-[#f7f2f3] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#1c1b1c]/80">
            Package Description
          </label>
          <textarea
            rows={5}
            placeholder="Describe what is included in this package..."
            value={packageForm.description}
            onChange={(e) =>
              setPackageForm((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full p-4 rounded-2xl bg-[#f7f2f3] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20 resize-none"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button
            onClick={() => setShowPackageModal(false)}
            className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSavePackage}
            className="px-8 py-3 bg-[#b12b31] text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            {editingPackageId ? "Update Package" : "Save Package"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePackageModal;
