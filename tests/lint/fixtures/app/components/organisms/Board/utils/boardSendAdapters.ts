type CommandName = 'Assign' | 'Approve';

interface SentCommand {
  readonly name: CommandName;
  readonly label: string;
}

export const toAssign = (): SentCommand => ({
  name: 'Assign',
  label: 'Assign a person',
});
