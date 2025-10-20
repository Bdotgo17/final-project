// Simulated backend API for authentication and card actions

export const authorize = () => {
  // Simulate login and return a fake token
  return new Promise((resolve) => {
    setTimeout(() => resolve({ token: "a fake token" }), 500);
  });
};

export const checkToken = () => {
  // Simulate token check and return fake user data
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: {
            name: "fake user",
            email: "fake@example.com",
            _id: "fake-id",
          },
        }),
      500
    );
  });
};

export const saveCard = (card) => {
  // Simulate saving a card
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...card, _id: "fake-card-id" }), 500);
  });
};

export const deleteCard = (cardId) => {
  // Simulate deleting a card
  return new Promise((resolve) => {
    setTimeout(() => resolve({ message: "Card deleted", cardId }), 500);
  });
};
