"use client";

import { EnvelopeIcon, PhoneIcon, StarIcon } from "@phosphor-icons/react/ssr";
import { UserRole } from "@prisma/client";
import { User as UserIcon } from "lucide-react"; // Added ExternalLink

import type { TPeopleInvolved } from "@/calendar/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getFullName } from "@/lib/get-text";
import { cn } from "@/lib/utils";

type TUser =
  | NonNullable<TPeopleInvolved>["client"]
  | NonNullable<TPeopleInvolved>["performers"][number];

type ClientWithSpecialties = NonNullable<TPeopleInvolved>["client"] & {
  specialties?: string[];
};

interface PersonDetailsDialogProps {
  person: TUser | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const getRoleIcon = (role?: string) => {
  switch (role?.toLowerCase()) {
    case "performer":
      return "🎤";
    case "client":
      return "👤";
    case "agency":
    case "admin":
    default:
      return "⚙️";
  }
};

const getRoleBadgeColor = (role?: string) => {
  switch (role?.toLowerCase()) {
    case "performer":
      return "bg-rose-100 text-rose-800 border-rose-200";
    case "client":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "agency":
    case "admin":
    default:
      return "bg-amber-100 text-amber-800 border-amber-200";
  }
};

export function PersonDetailsDialog({
  person,
  isOpen,
  onOpenChange,
}: PersonDetailsDialogProps) {
  if (!person) return null;

  const personName = getFullName(
    person?.user.first_name,
    person?.user.last_name,
  );

  const handleCopyEmail = async () => {
    if (person.user.primary_email) {
      try {
        await navigator.clipboard.writeText(person.user.primary_email);
        // TODO: Add toast notification for success (e.g., using sonner)
      } catch (_err) {
        // TODO: Add toast notification for error
        // For now, we can log the error in a way that doesn't trigger linting in dev, or handle it silently
        // console.error("Failed to copy email: ", _err); // Example: kept for dev, but will lint
      }
    }
  };

  // const handleCopyPhone = async () => { // If phone is added to TUser
  //   if (person.phone) {
  //     try {
  //       await navigator.clipboard.writeText(person.phone);
  //       console.log("Phone copied to clipboard");
  //     } catch (err) {
  //       console.error("Failed to copy phone: ", err);
  //     }
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Person Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center gap-4">
            <Avatar className="size-16 border-2 border-white shadow-lg">
              <AvatarImage src={person?.user.image_url} alt={personName} />
              <AvatarFallback className="bg-muted text-lg">
                {personName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {personName}
                </h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "gap-1.5 capitalize",
                    getRoleBadgeColor(person.user.role),
                  )}
                >
                  <span>{getRoleIcon(person.user.role)}</span>
                  {person.user.role || "User"}
                </Badge>
              </div>

              {typeof person.average_rating === "number" &&
                person.average_rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={cn(
                            "size-4",
                            star <= Math.floor(person.average_rating ?? 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {person.average_rating?.toFixed(1)} rating
                    </span>
                  </div>
                )}
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Contact Information</h4>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="size-5 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {person.user.primary_email}
                </span>
              </div>

              {person.phone_number && (
                <div className="flex items-center gap-3">
                  <PhoneIcon className="size-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {person.phone_number}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <UserIcon className="size-5 text-muted-foreground" />
                <span className="text-sm capitalize text-foreground">
                  {person.user.role}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Details</h4>

            <div className="space-y-3">
              {person.user.role === UserRole.performer &&
                person._count &&
                "event_performers" in person._count &&
                person._count.event_performers > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total events
                    </span>
                    <span className="text-sm text-foreground">
                      {person._count.event_performers}
                    </span>
                  </div>
                )}

              {person.user.role === UserRole.performer &&
                person._count &&
                "performer_feedback" in person._count &&
                person._count.performer_feedback > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total feedback
                    </span>
                    <span className="text-sm text-foreground">
                      {person._count.performer_feedback}
                    </span>
                  </div>
                )}

              {person.user.role === UserRole.client &&
                "company_name" in person &&
                person.company_name && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Company
                    </span>
                    <span className="text-sm text-foreground">
                      {person.company_name}
                    </span>
                  </div>
                )}

              {person.user.role === UserRole.client &&
                person._count &&
                "client_feedback" in person._count &&
                person._count.client_feedback > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total feedback
                    </span>
                    <span className="text-sm text-foreground">
                      {person._count.client_feedback}
                    </span>
                  </div>
                )}

              {person.user.role === UserRole.client &&
                (person).specialties &&
                (person).specialties!.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">
                      Specialties
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(person).specialties!.map(
                        (specialty: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {person?.user.primary_email && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() =>
                  window.open(`mailto:${person.user.primary_email}`)
                }
              >
                <EnvelopeIcon />
                <span>Message</span>
              </Button>
            )}
            {person?.phone_number && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(`tel:${person.phone_number}`)}
              >
                <PhoneIcon />
                <span>Call</span>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
