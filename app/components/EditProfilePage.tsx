"use client";
import React, { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { editUser } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { editUserSchema } from "@/app/utils/zodSchemas";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { toast } from "sonner";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export const ProfileEditPage: React.FC<Props> = ({
  address,
  email,
  firstName,
  lastName,
}: Props) => {
  const [lastResult, action] = useActionState(editUser, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: editUserSchema,
      });
    },
    onSubmit: () => {
      setTimeout(() => {
        toast.success("Profile updated succesfully");
      }, 700);
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleImageUpload = (): void => {
    // Aquí iría la lógica para cargar imágenes
    // Por ahora solo es un placeholder
    alert("Funcionalidad de carga de imagen se implementaría aquí");
  };

  const getInitials = (): string => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  return (
    <div className="container px-4 mx-auto py-6 md:py-10 max-w-5xl">
      {form.status === "success" && (
        <Alert className="mb-4 md:mb-6 bg-green-50 border-green-200">
          <Check className="h-5 w-5 text-green-500" />
          <AlertTitle>¡Perfil actualizado!</AlertTitle>
          <AlertDescription>
            Los cambios han sido guardados exitosamente.
          </AlertDescription>
        </Alert>
      )}

      {form.status === "error" && (
        <Alert className="mb-4 md:mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se pudieron guardar los cambios. Intenta nuevamente.
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-md">
        <CardHeader className="pb-4 md:pb-6">
          <CardTitle className="text-xl md:text-2xl">
            Información del Perfil
          </CardTitle>
          <CardDescription className="text-sm md:text-base mt-1">
            Actualiza tus datos personales y cómo te verán los demás en la
            plataforma.
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Sección de avatar y datos personales */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar section - centered on mobile, left-aligned on desktop */}
              <div className="flex flex-col items-center md:items-start gap-2 mb-2 md:mb-0">
                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                  <AvatarImage src={""} alt="Foto de perfil" />
                  <AvatarFallback className="text-lg">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleImageUpload}
                  className="text-xs md:text-sm"
                >
                  Cambiar foto
                </Button>
              </div>

              {/* Form fields section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1">
                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="firstName" className="text-sm md:text-base">
                    Nombre
                  </Label>
                  <Input
                    name={fields.firstName.name}
                    defaultValue={firstName}
                    key={fields.firstName.key}
                    className="h-9 md:h-10"
                    placeholder="First Name"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="lastName" className="text-sm md:text-base">
                    Apellido
                  </Label>
                  <Input
                    id={fields.lastName.id}
                    name={fields.lastName.name}
                    key={fields.lastName.key}
                    defaultValue={lastName}
                    className="h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1 md:space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="email" className="text-sm md:text-base">
                    Email
                  </Label>
                  <Input
                    id={fields.email.id}
                    defaultValue={email}
                    key={fields.email.key}
                    name={fields.email.name}
                    type="email"
                    className="h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1 md:space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="address" className="text-sm md:text-base">
                    Dirección
                  </Label>
                  <Textarea
                    id="address"
                    name={fields.address.name}
                    defaultValue={address}
                    key={fields.address.key}
                    rows={2}
                    className="min-h-[60px] md:min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2 pb-4 px-6">
            <div className="mt-2">
              <SubmitButton text="Update Profile" />
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
