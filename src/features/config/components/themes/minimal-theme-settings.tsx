import { Input } from "@/components/ui/input";
import { Field } from "@/features/config/components/site-settings-fields";
import type { SystemConfig } from "@/features/config/config.schema";
import { m } from "@/paraglide/messages";
import { useFormContext } from "react-hook-form";

export function MinimalThemeSettings() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SystemConfig>();

  const getInputClassName = (error?: string) =>
    error ? "border-destructive focus-visible:border-destructive" : undefined;

  return (
    <>
      <Field
        label={m.settings_site_field_navbar_name()}
        hint={m.settings_site_field_navbar_name_hint()}
        error={errors.site?.theme?.minimal?.navBarName?.message}
      >
        <Input
          {...register("site.theme.minimal.navBarName")}
          className={getInputClassName(
            errors.site?.theme?.minimal?.navBarName?.message,
          )}
          placeholder={m.settings_site_field_navbar_name_ph()}
        />
      </Field>
      <Field
        label={m.settings_site_field_hero_subtitle()}
        hint={m.settings_site_field_hero_subtitle_hint()}
        error={errors.site?.theme?.minimal?.heroSubtitle?.message}
      >
        <Input
          {...register("site.theme.minimal.heroSubtitle")}
          className={getInputClassName(
            errors.site?.theme?.minimal?.heroSubtitle?.message,
          )}
          placeholder={m.settings_site_field_hero_subtitle_ph()}
        />
      </Field>
    </>
  );
}
