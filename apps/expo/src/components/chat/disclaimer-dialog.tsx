import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  CheckSquareIcon,
  SparkleIcon,
  SquareIcon,
} from "phosphor-react-native";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { api } from "@/utils/api";

interface DisclaimerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
}

export function DisclaimerDialog({
  isOpen,
  onClose,
  conversationId,
}: DisclaimerDialogProps) {
  const [isChecked, setIsChecked] = useState(false);

  const confirmDisclaimerMutation =
    api.conversation.confirmDisclaimer.useMutation();

  const handleConfirm = async () => {
    if (!isChecked || !conversationId) return;

    try {
      await confirmDisclaimerMutation.mutateAsync({
        conversationId,
      });
      onClose();
    } catch (error) {
      console.error("Failed to confirm disclaimer:", error);
    }
  };

  const isConfirming = confirmDisclaimerMutation.isPending;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[90%] max-w-[90%] rounded-2xl">
        <AlertDialogHeader>
          <View className="mb-2 flex-row items-center gap-2">
            <SparkleIcon size={24} color="#624531" />
            <AlertDialogTitle className="text-xl font-bold">
              Lời nhắc từ Trợ lý AI Lagoona
            </AlertDialogTitle>
          </View>
          <AlertDialogDescription className="text-base">
            Trợ lý AI được thiết kế để đồng hành và gợi mở góc nhìn, nhưng đôi
            khi thông tin có thể chưa trọn vẹn hoặc chưa cập nhật đầy đủ.
            {"\n"}
            {"\n"}
            Với những quyết định quan trọng, quý khách nên tham khảo thêm nguồn
            tin cậy để đảm bảo sự an tâm tuyệt đối.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <View className="py-4">
          <Pressable
            onPress={() => setIsChecked(!isChecked)}
            className="flex-row items-start gap-3"
          >
            <View className="mt-0.5">
              {isChecked ? (
                <CheckSquareIcon size={24} color="#000" weight="fill" />
              ) : (
                <SquareIcon size={24} color="#666" />
              )}
            </View>
            <Text className="flex-1 text-sm leading-snug">
              Tôi hiểu rằng Trợ lý AI Lagoona có giới hạn và tôi sẽ xác minh độc
              lập những thông tin quan trọng.
            </Text>
          </Pressable>
        </View>

        <AlertDialogFooter>
          <Button
            onPress={handleConfirm}
            disabled={!isChecked || isConfirming}
            size="lg"
          >
            <Text className="font-medium">
              {isConfirming ? "Đang xác nhận..." : "Tôi hiểu rồi"}
            </Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
