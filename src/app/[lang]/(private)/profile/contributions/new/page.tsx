"use client";
import React from "react";
import FormSubmitBtn from "@/components/form/FormSubmitBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TContributionSchema,
  constributionSchema,
} from "@/schema/contributions/contribution.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import FormErr from "@/components/form/FormErr";
import { Textarea } from "@/components/ui/textarea";
import { useGetEvents } from "@/hooks/query/events.query";
import PageLoadingUI from "@/components/PageLoadingUI";
import { usePostContribution } from "@/hooks/mutations/contribution.mutation";
import { toast } from "sonner";
import { objectToFormData } from "@/lib/form";
import { ImageUploadBtn2 } from "@/components/ImageUploadBtn";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TContributionSchema>({
    resolver: zodResolver(constributionSchema),
  });
  const { data, isLoading } = useGetEvents();
  const { mutateAsync, isPending } = usePostContribution();

  const onSubmit = async (payload: TContributionSchema) => {
    console.log(payload);
    const formData = objectToFormData(payload);
    const promise = mutateAsync(formData).then(() => {});
    toast.promise(promise, {
      loading: "Please wait adding contribution.",
      success:
        "Contribution has been submitted successfully. Once admin verifies it, you will get a certificate",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  console.log(errors);
  if (isLoading) return <PageLoadingUI />;
  return (
    <div>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Claim your contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ImageUploadBtn2
              name="contributor_image"
              setValue={setValue}
              trigger={trigger}
            />
            <div>
              <CompulsoryLabel>Full Name</CompulsoryLabel>
              <Input
                {...register("full_name")}
                placeholder="Full name of the contributor"
              />
              <FormErr>{errors.full_name?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Amount</CompulsoryLabel>
              <Input
                {...register("amount")}
                type="number"
                placeholder="Eg: 1000"
              />
              <FormErr>{errors.amount?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Phone</CompulsoryLabel>{" "}
              <span className="text-xs text-muted-foreground">
                If you have donated before with the same number it will add up.
              </span>
              <Input
                {...register("phone")}
                type="number"
                placeholder="Eg: 98xxxxxxxxx"
              />
              <FormErr>{errors.phone?.message}</FormErr>
            </div>
            <div className="flex gap-3 py-3">
              <div className="flex-1">
                <CompulsoryLabel>Contribution Type</CompulsoryLabel>
                <select
                  {...register("type")}
                  defaultValue=""
                  id=""
                  className="select"
                >
                  <option value="" disabled>
                    Select type of contribution
                  </option>
                  <option value="ORG">Organizational</option>
                  <option value="EVENT">Events</option>
                </select>
                <FormErr>{errors.type?.message}</FormErr>
              </div>

              <div className="flex-1">
                <CompulsoryLabel>Mode of payment</CompulsoryLabel>
                <select
                  {...register("mode")}
                  defaultValue=""
                  id=""
                  className="select"
                >
                  <option value="" disabled>
                    Mode of payment
                  </option>
                  <option value="ewallet">
                    Ewallet (esewa, khalti, imepay etc..)
                  </option>
                  <option value="bank">
                    Bank(phonepay, cheque, connect-ips)
                  </option>
                  <option value="cash">Cash</option>
                </select>
                <FormErr>{errors.mode?.message}</FormErr>
              </div>

              {watch("type") === "EVENT" && (
                <div className="flex-1">
                  <CompulsoryLabel>Event Name</CompulsoryLabel>
                  <select
                    {...register("eventId")}
                    defaultValue=""
                    className="select"
                  >
                    <option value="" disabled>
                      Select an event
                    </option>
                    {data?.map((event: any) => (
                      <option
                        key={event._id}
                        value={event._id}
                        className="line-clamp-1"
                      >
                        {event.title}
                      </option>
                    ))}
                  </select>
                  <FormErr>{errors.eventId?.message}</FormErr>
                </div>
              )}
            </div>

            <div>
              <CompulsoryLabel>Transaction Receipt</CompulsoryLabel>
              <Input
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    setValue("receipt_photo", file);
                    trigger("receipt_photo");
                  }
                }}
                type="file"
              />
              <FormErr>{errors.receipt_photo?.message}</FormErr>
            </div>

            <div>
              <CompulsoryLabel>Purpose</CompulsoryLabel>
              <Textarea
                {...register("purpose")}
                placeholder="Write purpose of your donation"
              ></Textarea>
            </div>

            <FormSubmitBtn isSubmitting={isPending}>
              Claim contribution
            </FormSubmitBtn>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
