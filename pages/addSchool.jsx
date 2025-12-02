import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);

      // image is a FileList, so take first file
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
        // DO NOT set Content-Type manually (browser will set boundary)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add school");
      }

      alert("School added successfully!");
      console.log("API result:", result);
      reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Add School</h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Fill the details below. Right now this form only validates inputs.
        In the next step we&apos;ll save it into MySQL and upload image.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* School Name */}
        <div style={{ marginBottom: "12px" }}>
          <label>School Name</label>
          <input
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            {...register("name", { required: "School name is required" })}
            placeholder="e.g. Sunshine Public School"
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.name.message}</p>
          )}
        </div>

        {/* Address */}
        <div style={{ marginBottom: "12px" }}>
          <label>Address</label>
          <textarea
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            {...register("address", { required: "Address is required" })}
            placeholder="Street, Area, Landmark..."
          />
          {errors.address && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div style={{ marginBottom: "12px" }}>
          <label>City</label>
          <input
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            {...register("city", { required: "City is required" })}
            placeholder="e.g. Noida"
          />
          {errors.city && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div style={{ marginBottom: "12px" }}>
          <label>State</label>
          <input
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            {...register("state", { required: "State is required" })}
            placeholder="e.g. Uttar Pradesh"
          />
          {errors.state && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.state.message}</p>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: "12px" }}>
          <label>Contact Number</label>
          <input
            type="tel"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
            placeholder="e.g. 9876543210"
          />
          {errors.contact && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "12px" }}>
          <label>School Email</label>
          <input
            type="email"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="e.g. info@school.com"
          />
          {errors.email_id && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.email_id.message}
            </p>
          )}
        </div>

        {/* Image */}
        <div style={{ marginBottom: "12px" }}>
          <label>School Image</label>
          <input
            type="file"
            accept="image/*"
            style={{ display: "block", marginTop: "4px" }}
            {...register("image", { required: "School image is required" })}
          />
          {errors.image && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 16px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit (frontend only)"}
        </button>
      </form>
    </div>
  );
}
