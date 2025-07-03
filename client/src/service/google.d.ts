interface GoogleAccounts {
  id: {
    initialize: (config: {
      client_id: string;
      callback: (response: any) => void;
    }) => void;
    renderButton: (
      element: HTMLElement | null,
      options: {
        theme: string;
        size: string;
        text: string;
        shape: string;
        width: number;
      }
    ) => void;
  };
}

interface Window {
  google: GoogleAccounts;
}