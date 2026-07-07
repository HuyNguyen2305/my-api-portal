export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  get(where = {}, options = {}) {
    return this.model.findAll({ where, ...options });
  }

  getOne(where = {}, options = {}) {
    return this.model.findOne({ where, ...options });
  }

  create(data, options = {}) {
    return this.model.create(data, options);
  }

  async update(where, data, options = {}) {
    const [, updated] = await this.model.update(data, {
      where,
      returning: true,
      ...options
    });
    return updated?.[0] ?? null;
  }

  delete(where, options = {}) {
    return this.model.destroy({ where, ...options });
  }

  softDelete(where, options = {}) {
    return this.model.update(
      { deletedAt: new Date() },
      { where, ...options }
    );
  }

  async pagination({ page = 1, limit = 20, where = {}, options = {} } = {}) {
    const { rows, count } = await this.model.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      ...options
    });

    return {
      rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    };
  }
}
