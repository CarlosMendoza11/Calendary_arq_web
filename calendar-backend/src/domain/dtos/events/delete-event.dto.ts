export class DeleteEventDto {
    private constructor(
        public id: string,
        public user: { id: string },
    ) { }

    static create(object: { [key: string]: any }): [string?, DeleteEventDto?] {
        const { user } = object.body;
        const { id } = object.params;

        if (!id) return ['Missing id'];
        if (!user?.id) return ['Missing user id'];

        return [undefined, new DeleteEventDto(id, user)];
    }
}
