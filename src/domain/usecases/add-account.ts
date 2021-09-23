import {
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository
} from '@/domain/contracts/repositories'
import {
  EmailInUseError,
  UsernameInUseError,
  ValidationError
} from '@/domain/entities/errors'

type Input = {
  username: string
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
  email: string
  phone?: string
}

export class AddAccount {
  constructor(
    private readonly accountRepository: CheckAccountByUsernameRepository &
      CheckAccountByEmailRepository
  ) {}

  async add(input: Input): Promise<void> {
    const errors = await this.canPerform(input)

    if (errors.length > 0) {
      throw new ValidationError(errors)
    }
  }

  private async canPerform(input: Input): Promise<Error[]> {
    const errors = []

    const usernameInUse = await this.accountRepository.checkByUsername({
      username: input.username
    })
    if (usernameInUse) {
      errors.push(new UsernameInUseError())
    }

    const emailInUse = await this.accountRepository.checkByEmail({
      email: input.email
    })
    if (emailInUse) {
      errors.push(new EmailInUseError())
    }

    return errors
  }
}
