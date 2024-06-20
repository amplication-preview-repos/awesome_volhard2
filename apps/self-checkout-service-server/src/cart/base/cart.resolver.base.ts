/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { Cart } from "./Cart";
import { CartCountArgs } from "./CartCountArgs";
import { CartFindManyArgs } from "./CartFindManyArgs";
import { CartFindUniqueArgs } from "./CartFindUniqueArgs";
import { CreateCartArgs } from "./CreateCartArgs";
import { UpdateCartArgs } from "./UpdateCartArgs";
import { DeleteCartArgs } from "./DeleteCartArgs";
import { OrderFindManyArgs } from "../../order/base/OrderFindManyArgs";
import { Order } from "../../order/base/Order";
import { User } from "../../user/base/User";
import { CartService } from "../cart.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Cart)
export class CartResolverBase {
  constructor(
    protected readonly service: CartService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Cart",
    action: "read",
    possession: "any",
  })
  async _cartsMeta(
    @graphql.Args() args: CartCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Cart])
  @nestAccessControl.UseRoles({
    resource: "Cart",
    action: "read",
    possession: "any",
  })
  async carts(@graphql.Args() args: CartFindManyArgs): Promise<Cart[]> {
    return this.service.carts(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Cart, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Cart",
    action: "read",
    possession: "own",
  })
  async cart(@graphql.Args() args: CartFindUniqueArgs): Promise<Cart | null> {
    const result = await this.service.cart(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Cart)
  @nestAccessControl.UseRoles({
    resource: "Cart",
    action: "create",
    possession: "any",
  })
  async createCart(@graphql.Args() args: CreateCartArgs): Promise<Cart> {
    return await this.service.createCart({
      ...args,
      data: {
        ...args.data,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Cart)
  @nestAccessControl.UseRoles({
    resource: "Cart",
    action: "update",
    possession: "any",
  })
  async updateCart(@graphql.Args() args: UpdateCartArgs): Promise<Cart | null> {
    try {
      return await this.service.updateCart({
        ...args,
        data: {
          ...args.data,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Cart)
  @nestAccessControl.UseRoles({
    resource: "Cart",
    action: "delete",
    possession: "any",
  })
  async deleteCart(@graphql.Args() args: DeleteCartArgs): Promise<Cart | null> {
    try {
      return await this.service.deleteCart(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Order], { name: "orders" })
  @nestAccessControl.UseRoles({
    resource: "Order",
    action: "read",
    possession: "any",
  })
  async findOrders(
    @graphql.Parent() parent: Cart,
    @graphql.Args() args: OrderFindManyArgs
  ): Promise<Order[]> {
    const results = await this.service.findOrders(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, {
    nullable: true,
    name: "user",
  })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async getUser(@graphql.Parent() parent: Cart): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
