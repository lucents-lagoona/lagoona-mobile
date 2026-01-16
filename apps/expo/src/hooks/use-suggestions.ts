import { useMemo } from "react";

import { api } from "@/utils/api";

const resortTags = ["residential", "nature", "royale"];
const selectedResort = "residential";

export interface Suggestion {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  locale: "vi" | "en";
  tag: string;
  text: string;
  display_text: string | null;
  icon: string;
}

export function useSuggestions() {
  const { data: suggestionsData, refetch: refetchSuggestions } =
    api.admin.chatSuggestion.getChatSuggestions.useQuery(
      {
        tags: resortTags,
        locale: "vi",
      },
      {
        enabled: !!selectedResort,
      },
    );

  const { data: followUpSuggestions, refetch: refetchFollowUpSuggestions } =
    api.admin.chatSuggestion.getByTag.useQuery(
      {
        tags: [selectedResort],
        locale: "vi",
      },
      {
        enabled: false,
      },
    );

  const suggestions = useMemo(() => {
    if (!suggestionsData) {
      return [];
    }
    return suggestionsData.filter(
      (suggestion) => suggestion.tag === selectedResort,
    );
  }, [suggestionsData, selectedResort]);

  return {
    suggestions: suggestions as Suggestion[],
    followUpSuggestions: followUpSuggestions as Suggestion[],
    refetchFollowUpSuggestions:
      refetchFollowUpSuggestions as () => Promise<void>,
    refetchSuggestions: refetchSuggestions as unknown as () => Promise<void>,
  };
}
