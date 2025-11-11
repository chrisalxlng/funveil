<script lang="ts">
  type Props = {
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
  let { firstName, lastName, emailAddress }: Props = $props();

  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  const fullName = `${firstName} ${lastName}`;
</script>

<div class="flex gap-3 items-center">
  <div
    class="flex items-center justify-center w-10 h-10 rounded-full font-display font-bold bg-primary text-typography-on-primary text-md"
  >
    {initials}
  </div>
  <div class="flex flex-col">
    <span class="font-bold text-typography-attention font-display">{fullName}</span>
    <span class="text-typography-subtle font-base text-xs">{emailAddress}</span>
  </div>
</div>
