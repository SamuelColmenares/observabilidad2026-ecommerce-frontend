import React, { useEffect } from "react";

export const Notifications: React.FC = () => {
  useEffect(() => {
    throw new Error(
      "This is a test error for the GeneralErrorBoundary component.",
    );
  });

  return (
    <div>
      <h2>Notifications</h2>
      <p>This is the notifications page.</p>
    </div>
  );
};
