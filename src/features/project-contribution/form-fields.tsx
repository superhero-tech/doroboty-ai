import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { groups } from "./fields";
import type { FieldName, ProjectDraft } from "./model";

export function ProjectContributionFields({
  value,
  errors,
  onChange,
  profile = false,
  prefix = "project",
}: {
  value: ProjectDraft;
  errors: Partial<Record<FieldName, string>>;
  onChange: (name: FieldName, value: string) => void;
  profile?: boolean;
  prefix?: string;
}) {
  return groups.map((group) => (
    <fieldset key={group.title} className="contribution-group">
      <legend>
        {profile && group.title.startsWith("01") ? "01. Projekt i Twoja rola" : group.title}
      </legend>
      <p>{group.intro}</p>
      {group.fields
        .filter((field) => !profile || field.name !== "target")
        .map((field) => {
          const Control = field.short ? Input : Textarea;
          const id = `${prefix}-${field.name}`;
          return (
            <div className="contribution-field" key={field.name}>
              <label htmlFor={id}>
                {field.label}
                {field.optional && <span> · opcjonalnie</span>}
              </label>
              <p id={`${id}-hint`}>{field.hint}</p>
              <div className="dr-input-frame">
                <Control
                  id={id}
                  name={field.name}
                  value={value[field.name]}
                  required={!field.optional}
                  maxLength={field.name === "link" ? 600 : field.short ? 200 : 1600}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={`${id}-hint${errors[field.name] ? ` ${id}-error` : ""}`}
                  onChange={(event) => onChange(field.name, event.target.value)}
                />
              </div>
              {errors[field.name] && (
                <p className="contribution-error" id={`${id}-error`}>
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}
    </fieldset>
  ));
}
