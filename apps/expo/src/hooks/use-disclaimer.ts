import { useEffect, useState } from "react";

import { api } from "@/utils/api";

export function useDisclaimer(
  conversationId: string | null,
  options: { enabled?: boolean } = { enabled: true },
) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const { data: conversation, refetch } = api.conversation.getById.useQuery(
    { id: conversationId! },
    {
      enabled: !!conversationId,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (conversation && conversationId && options.enabled) {
      // Show disclaimer if conversation exists but disclaimer not confirmed
      const shouldShowDisclaimer = !conversation.disclaimerConfirmed;
      setShowDisclaimer(shouldShowDisclaimer);
    }
  }, [conversation, conversationId, options.enabled]);

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
    // Refetch conversation to get updated disclaimer status
    void refetch();
  };

  return {
    showDisclaimer,
    handleDisclaimerClose,
    isDisclaimerConfirmed: conversation?.disclaimerConfirmed || false,
  };
}
